<?php

declare(strict_types=1);

namespace App\Interface\Http\Response;

final class JsonResponse
{
    public static function success(array $data = [], int $statusCode = 200): void
    {
        self::send($data, $statusCode);
    }

    public static function error(array $data = [], int $statusCode = 400): void
    {
        self::send($data, $statusCode);
    }

    public static function send(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);

        header('Content-Type: application/json; charset=utf-8');

        echo json_encode(
            $data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }
}
