<?php

namespace App;

enum Medium: string
{
    case Oil = 'oil';
    case Acrylic = 'acrylic';
    case Watercolor = 'watercolor';
    case Sculpture = 'sculpture';
    case Digital = 'digital';
    case Photography = 'photography';
    case MixedMedia = 'mixed_media';
    case Installation = 'installation';
    case Drawing = 'drawing';
    case Printmaking = 'printmaking';
    case Ceramic = 'ceramic';
    case Video = 'video';
}
