<?php

abstract class API
{
    public static function appel(array $arguments, string $fonction)
    {
        if ($fonction($arguments) == false) http_response_code(400);
    }
}