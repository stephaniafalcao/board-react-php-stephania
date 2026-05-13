<?php

declare(strict_types=1);

namespace App\Application\Board\DTO;

final readonly class BoardListItemDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        public string $themeColor,
        public string $icon,
        public int $tasksCount,
        public string $createdAt,
    ) {}
}
