from django.core.exceptions import ObjectDoesNotExist
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST, 
    HTTP_401_UNAUTHORIZED, 
    HTTP_403_FORBIDDEN, 
    HTTP_404_NOT_FOUND, 
)
from ..models import CloudinaryUtilities, QuizCoverModel
from ..serializers import QuizCoverSerializer
from ...user.views import UserUtilities
from ...quiz.models import QuizModel


class QuizCoverView(APIView, CloudinaryUtilities, UserUtilities): 
    parser_classes = (MultiPartParser, FormParser, JSONParser, ) 
    http_method_names = ['get', 'put', 'delete', ]

    def get(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        try:
            quiz_image_model = QuizCoverModel.objects.get(user=quiz_model)
            media_serializer = QuizCoverSerializer(instance=quiz_image_model)
            return Response(data=media_serializer.data, status=HTTP_200_OK)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz has no saved cover'}, status=HTTP_404_NOT_FOUND)

    def put(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        cover = request.data.get('cover')
        filename = request.data.get('filename')

        if(cover and filename):
            # -------------=====Converting-to-base64=====-------------
            if isinstance(cover, InMemoryUploadedFile): 
                # form-data 
                cover = self.convert_to_base64(cover) 
            elif 'base64' in cover: 
                # base64 (frontend cropped) 
                cover = "data:image/png;base64," + cover.split(",")[1] 
            else:
                pass

            try: 
                if not (quiz_model in user_model.settings.quiz.all()):
                    return Response(data={'message': "You cannot edit another user's quiz cover"}, status=HTTP_403_FORBIDDEN)
                
                if getattr(quiz_model, 'cover') == None:
                    quiz_cover_model = QuizCoverModel()
                else:
                    quiz_cover_model = QuizCoverModel.objects.get(quiz=quiz_model)
            
                cloudinary_cover = self.save_image(cover)

                quiz_cover_model.asset_id = cloudinary_cover.get('asset_id')
                quiz_cover_model.public_id = cloudinary_cover.get('public_id')
                quiz_cover_model.filename = cloudinary_cover.get('original_filename')
                quiz_cover_model.secure_url = cloudinary_cover.get('secure_url')
                quiz_cover_model.url = cloudinary_cover.get('url')
                quiz_cover_model.format = cloudinary_cover.get('format')
                quiz_cover_model.width = cloudinary_cover.get('width')
                quiz_cover_model.height = cloudinary_cover.get('height')

                quiz_cover_model.save()

                quiz_model.cover = quiz_cover_model
                quiz_model.save()

                media_serializer = QuizCoverSerializer(instance=quiz_cover_model)

                return Response(data=media_serializer.data, status=HTTP_201_CREATED)
            
            except Exception as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Could not save image to CloudinaryCloud: ' + str(e)}, status=HTTP_400_BAD_REQUEST)

        return Response(data={'message': 'No cover or filename'}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            user_model = self.get_user()
        except AttributeError as e:
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        if not (quiz_model in user_model.settings.quiz.all()):
            return Response(data={'message': "You cannot delete another user's quiz cover"}, status=HTTP_403_FORBIDDEN)

        if quiz_model.cover is not None:
            quiz_image_model = QuizCoverModel.objects.get(quiz=quiz_model)
            self.destroy_image(quiz_image_model.public_id)
            quiz_image_model.delete()

            return Response(data={'message': 'Quiz cover deleted'}, status=HTTP_200_OK)
        
        return Response(data={'message': 'Quiz has no cover to delete'}, status=HTTP_400_BAD_REQUEST)

