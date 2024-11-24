all:
	-@ docker compose up -d

clean:
	-@ docker compose stop
	-@ docker compose down
	-@ docker network rm image_gallery_network
	-@ docker volume rm front_volume
	-@ docker volume rm back_volume

fclean: clean
	-@ docker rmi -f $$(docker images -qa)

re: clean all

logs:
	docker compose logs -f

.PHONY: all clean fclean re logs