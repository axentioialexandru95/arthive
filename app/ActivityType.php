<?php

namespace App;

enum ActivityType: string
{
    case AlbumCreated = 'album_created';
    case SpaceListed = 'space_listed';
    case ExhibitionAnnounced = 'exhibition_announced';
    case ArtistIncluded = 'artist_included';
    case SpaceBooked = 'space_booked';
    case UserFollowed = 'user_followed';
}
