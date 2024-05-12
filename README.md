# Youtube Project

## Environment Setup
### Prerequisite
* Must have PostgreSQL installed on your computer

### Steps
1. Run `npm install` in the front-end directory
2. Run `pip install` in the back-end directory
3. Create a folder in the overall project directory to act as the app's file storage
4. In the file storage folder create two additional folders:
   1. "profile_pic"
   2. "channel-banner"
4. Create a .env file with:
    ```
    DJANGO_SECRET_KEY="django-insecure-switld@sd0w1^30(r_+cm0puev6@@)w@e(fhxvz@iq@ft(l3c2"

    DB_NAME=<name>
    DB_USER=<postgres-user>
    DB_PASSWORD=<postgres-password>
    DB_HOST=localhost
    DB_PORT=<port>
    
    MEDIA_FILE_STORAGE=<name-of-storage>
    ```



