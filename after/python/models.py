from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    image_name = models.CharField(max_length=100)
    collection = models.CharField(max_length=100, default='')
    material = models.CharField(max_length=200, default='Золото 585')
    stone = models.CharField(max_length=200, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'hefastos'

    def __str__(self):
        return self.title
