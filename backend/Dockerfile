FROM php:8.2-fpm-alpine AS base

WORKDIR /var/www/html

RUN apk add --no-cache libpq \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS postgresql-dev \
    && docker-php-ext-install pdo_pgsql opcache \
    && apk del .build-deps

COPY . /var/www/html

EXPOSE 9000

FROM base AS development
RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY ./php/dev.ini "$PHP_INI_DIR/conf.d/zz-app-dev.ini"
CMD ["php-fpm"]

FROM base AS production
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY ./php/opcache.ini "$PHP_INI_DIR/conf.d/opcache.ini"
COPY ./php/prod.ini "$PHP_INI_DIR/conf.d/zz-app-prod.ini"
CMD ["php-fpm"]
