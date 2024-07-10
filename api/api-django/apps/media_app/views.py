from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from .models import UserImageModel, QuizImageModel
from .serializers import UserImageSerializer, QuizImageSerializer
from ..user.views import UserUtilities
from ..quiz.models import QuizModel


class UserImageView(APIView, UserUtilities):
    http_method_names = ['post', 'get', 'put', 'delete', ]

    def post(self, request: HttpRequest) -> Response: 
        user_model = self.get_user()
        if user_model.avatar is None:

            image = request.data.get('image')
            cloudinary_image = UserImageModel.save_image(image) # public_id will be randomly generated
            user_image_model = UserImageModel()

            user_image_model.asset_id = cloudinary_image.get('asset_id')
            user_image_model.public_id = cloudinary_image.get('public_id')
            user_image_model.filename = cloudinary_image.get('original_filename')
            user_image_model.secure_url = cloudinary_image.get('secure_url')
            user_image_model.url = cloudinary_image.get('url')
            user_image_model.type = cloudinary_image.get('format')
            user_image_model.width = cloudinary_image.get('width')
            user_image_model.height = cloudinary_image.get('height')

            user_image_model.save()

            user_model.avatar = user_image_model
            user_model.save()

            media_serializer = UserImageSerializer(instance=user_image_model)

            return Response(data=media_serializer.data, status=HTTP_201_CREATED)
        
        return Response(data={'message': 'User already has an image file'}, status=HTTP_400_BAD_REQUEST)
    
    def get(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        if isinstance(user_model, get_user_model()): 
            # Retrieve image 
            user_image_model = UserImageModel.objects.get(user=user_model)
            media_serializer = UserImageSerializer(instance=user_image_model)

            return Response(data=media_serializer.data, status=HTTP_200_OK)
        
        # List images 
        # TODO: DELETE-ME (temporary)
        user_image_model = UserImageModel.objects.all()
        media_serializer = UserImageSerializer(instance=user_image_model, many=True)

        return Response(data=media_serializer.data, status=HTTP_200_OK)


    def put(self, request: HttpRequest) -> Response:
        image = request.data.get('image')
        cloudinary_image = UserImageModel.save_image(image) # public_id will be randomly generated
        
        user_model = self.get_user()
        user_image_model = UserImageModel.objects.get(user=user_model)

        user_image_model.asset_id = cloudinary_image.get('asset_id')
        user_image_model.public_id = cloudinary_image.get('public_id')
        user_image_model.filename = cloudinary_image.get('original_filename')
        user_image_model.secure_url = cloudinary_image.get('secure_url')
        user_image_model.url = cloudinary_image.get('url')
        user_image_model.type = cloudinary_image.get('format')
        user_image_model.width = cloudinary_image.get('width')
        user_image_model.height = cloudinary_image.get('height')

        user_image_model.save()

        media_serializer = UserImageSerializer(instance=user_image_model)

        return Response(data=media_serializer.data, status=HTTP_201_CREATED)

    def delete(self, request: HttpRequest) -> Response:
        user_model = self.get_user()

        if isinstance(user_model, get_user_model()): 
            if user_model.avatar is not None:
                user_image_model = UserImageModel.objects.get(user=user_model)
                UserImageModel.destroy_image(user_image_model.public_id)

                return Response(data={'message': 'Image deleted'}, status=HTTP_200_OK)
            
            return Response(data={'message': 'User has no image to delete'}, status=HTTP_400_BAD_REQUEST)
        
        return Response(data={'message': 'User not found'}, status=HTTP_404_NOT_FOUND)


class QuizImageView(APIView): 
    quiz_image_model = QuizImageModel
    quiz_image_serializer = QuizImageSerializer

    def post(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        if quiz_model.cover is None:
            image = request.data.get('image')
            cloudinary_image = QuizImageModel.save_image(image) # public_id will be randomly generated
            quiz_image_model = QuizImageModel()

            quiz_image_model.asset_id = cloudinary_image.get('asset_id')
            quiz_image_model.public_id = cloudinary_image.get('public_id')
            quiz_image_model.filename = cloudinary_image.get('original_filename')
            quiz_image_model.secure_url = cloudinary_image.get('secure_url')
            quiz_image_model.url = cloudinary_image.get('url')
            quiz_image_model.type = cloudinary_image.get('format')
            quiz_image_model.width = cloudinary_image.get('width')
            quiz_image_model.height = cloudinary_image.get('height')

            quiz_image_model.save()

            quiz_model.cover = quiz_image_model
            quiz_model.save()

            media_serializer = QuizImageSerializer(instance=quiz_image_model)

            return Response(data=media_serializer.data, status=HTTP_201_CREATED)

        return Response(data={'message': 'Quiz already has an image file'}, status=HTTP_400_BAD_REQUEST)

    def get(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        quiz_image_model = QuizImageModel.objects.get(user=quiz_model)
        media_serializer = QuizImageSerializer(instance=quiz_image_model)

        return Response(data=media_serializer.data, status=HTTP_200_OK)

    def put(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)
        
        image = request.data.get('image')
        cloudinary_image = QuizImageModel.save_image(image) # public_id will be randomly generated
        
        quiz_image_model = QuizImageModel.objects.get(user=quiz_model)

        quiz_image_model.asset_id = cloudinary_image.get('asset_id')
        quiz_image_model.public_id = cloudinary_image.get('public_id')
        quiz_image_model.filename = cloudinary_image.get('original_filename')
        quiz_image_model.secure_url = cloudinary_image.get('secure_url')
        quiz_image_model.url = cloudinary_image.get('url')
        quiz_image_model.type = cloudinary_image.get('format')
        quiz_image_model.width = cloudinary_image.get('width')
        quiz_image_model.height = cloudinary_image.get('height')

        quiz_image_model.save()

        media_serializer = QuizImageSerializer(instance=quiz_image_model)

        return Response(data=media_serializer.data, status=HTTP_201_CREATED)

    def delete(self, request: HttpRequest, pk: int = None) -> Response: # quiz pk
        try:
            quiz_model = QuizModel.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            return Response(data={'message': 'Quiz not found'}, status=HTTP_404_NOT_FOUND)

        if quiz_model.cover is not None:
            quiz_image_model = QuizImageModel.objects.get(user=quiz_model)
            QuizImageModel.destroy_image(quiz_image_model.public_id)

            return Response(data={'message': 'Image deleted'}, status=HTTP_200_OK)
        
        return Response(data={'message': 'Quiz has no image to delete'}, status=HTTP_400_BAD_REQUEST)

