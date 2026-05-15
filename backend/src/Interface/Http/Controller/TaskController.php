<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller;

use App\Application\Task\DTO\UpdateTaskStatusDTO;
use App\Application\Task\UseCase\UpdateTaskStatusUseCase;
use App\Interface\Http\Response\JsonResponse;
use InvalidArgumentException;
use JsonException;
use Throwable;

final class TaskController
{
    public function __construct(
        private readonly UpdateTaskStatusUseCase $updateTaskStatusUseCase
    ) {}

    public function updateStatus(): void
    {
        try {
            $rawPayload = file_get_contents('php://input');

            if ($rawPayload === false || trim($rawPayload) === '') {
                JsonResponse::error([
                    'error' => 'Invalid JSON payload',
                ], 400);

                return;
            }

            $payload = json_decode($rawPayload, true, 512, JSON_THROW_ON_ERROR);

            if (!is_array($payload)) {
                JsonResponse::error([
                    'error' => 'Invalid JSON payload',
                ], 400);

                return;
            }

            $input = UpdateTaskStatusDTO::fromArray($payload);
            $this->updateTaskStatusUseCase->execute($input);

            JsonResponse::success([
                'message' => 'Task status updated successfully.',
            ]);
        } catch (JsonException) {
            JsonResponse::error([
                'error' => 'Invalid JSON payload',
            ], 400);
        } catch (InvalidArgumentException $exception) {
            JsonResponse::error([
                'error' => $exception->getMessage(),
            ], 422);
        } catch (Throwable) {
            JsonResponse::error([
                'error' => 'Unable to update task status',
            ], 500);
        }
    }
}
