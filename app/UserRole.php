<?php

namespace App;

enum UserRole: string
{
    case Admin = 'admin';
    case Curator = 'curator';
    case Artist = 'artist';
    case Gallery = 'gallery';
    case User = 'user';
}
