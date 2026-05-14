<?php

declare(strict_types=1);

namespace App\Application\Board\DTO;

use InvalidArgumentException;

final readonly class CreateBoardInputDTO
{
    public function __construct(
        public string $name,
        public ?string $description,
        public string $themeColor,
        public string $icon,
    ) {
        $this->validate();
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name: trim((string) ($data['name'] ?? '')),
            description: isset($data['description']) && $data['description'] !== ''
                ? trim((string) $data['description'])
                : null,
            themeColor: trim((string) ($data['themeColor'] ?? '')),
            icon: trim((string) ($data['icon'] ?? '')),
        );
    }

    private function validate(): void
    {
        if ($this->name === '') {
            throw new InvalidArgumentException('Board name is required.');
        }

        if (mb_strlen($this->name) > 100) {
            throw new InvalidArgumentException('Board name must have at most 100 characters.');
        }

        if ($this->themeColor === '') {
            throw new InvalidArgumentException('Theme color is required.');
        }

        if ($this->icon === '') {
            throw new InvalidArgumentException('Board icon is required.');
        }
    }
}
