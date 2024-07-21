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
    HTTP_404_NOT_FOUND, 
)
from ..models import CloudinaryUtilities, UserImageModel
from ..serializers import UserImageSerializer
from ...user.views import UserUtilities


class UserImageView(APIView, UserUtilities, CloudinaryUtilities):
    parser_classes = (MultiPartParser, FormParser, JSONParser, ) 
    http_method_names = ['get', 'put', 'delete', ]
    
    def get(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        try:
            user_image_model = UserImageModel.objects.get(user=user_model)
            media_serializer = UserImageSerializer(instance=user_image_model)
            return Response(data=media_serializer.data, status=HTTP_200_OK)
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User has no saved image'}, status=HTTP_404_NOT_FOUND)


    def put(self, request: HttpRequest) -> Response: 
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        image = request.data.get('image')
        filename = request.data.get('filename')

        if(image and filename):
            # -------------=====Converting-to-base64=====-------------
            if isinstance(image, InMemoryUploadedFile): 
                # form-data 
                image = self.convert_to_base64(image) 
            elif 'base64' in image: 
                # base64 (frontend cropped) 
                image = "data:image/png;base64," + image.split(",")[1] 
            else:
                pass

            try: 
                if getattr(user_model, 'avatar') == None:
                    user_image_model = UserImageModel()
                else:
                    user_image_model = UserImageModel.objects.get(user=user_model)

                cloudinary_image = self.save_image(image) # public_id will be randomly generated

                user_image_model.asset_id = cloudinary_image.get('asset_id')
                user_image_model.public_id = cloudinary_image.get('public_id')
                user_image_model.filename = filename
                user_image_model.secure_url = cloudinary_image.get('secure_url')
                user_image_model.url = cloudinary_image.get('url')
                user_image_model.format = cloudinary_image.get('format')
                user_image_model.width = cloudinary_image.get('width')
                user_image_model.height = cloudinary_image.get('height')

                user_image_model.save()

                user_model.avatar = user_image_model
                user_model.save()

                media_serializer = UserImageSerializer(instance=user_model.avatar)

                return Response(data=media_serializer.data, status=HTTP_201_CREATED)
            
            except Exception as e:
                # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
                return Response(data={'message': 'Could not save image to CloudinaryCloud: ' + str(e)}, status=HTTP_400_BAD_REQUEST)
            
        return Response(data={'message': 'No image or filename'}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request: HttpRequest) -> Response:
        try:
            user_model = self.get_user()
        except AttributeError as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'Invalid token'}, status=HTTP_401_UNAUTHORIZED)
        
        except ObjectDoesNotExist as e:
            # print('-x' * 35 + '-\n', e.__class__.__name__, ': ', e, '\n', '*' * 70, '\n', sep='') 
            return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

        if user_model.avatar is not None:
            user_image_model = UserImageModel.objects.get(user=user_model)
            self.destroy_image(user_image_model.public_id)
            user_image_model.delete()

            return Response(data={'message': 'Image deleted'}, status=HTTP_200_OK)
        
        return Response(data={'message': 'User has no image to delete'}, status=HTTP_400_BAD_REQUEST)


