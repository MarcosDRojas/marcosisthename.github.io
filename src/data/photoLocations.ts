export interface LocationPhoto {
  src: string
  alt: string
  caption?: string
}

export interface PhotoLocation {
  id: string
  name: string
  lat: number
  lon: number
  photos: LocationPhoto[]
}

const imageBase = import.meta.env.BASE_URL

export const photoLocations: PhotoLocation[] = [
  {
    id: 'durham-nc',
    name: 'Durham, NC',
    lat: 35.994,
    lon: -78.8986,
    photos: [],
  },
  {
    id: 'new-york-ny',
    name: 'New York, NY',
    lat: 40.7128,
    lon: -74.006,
    photos: [],
  },
  {
    id: 'mexico-city',
    name: 'Mexico City, Mexico',
    lat: 19.4326,
    lon: -99.1332,
    photos: [],
  },
  {
    id: 'dubrovnik-croatia',
    name: 'Dubrovnik, Croatia',
    lat: 42.6407,
    lon: 18.1108,
    photos: [
      {
        src: `${imageBase}images/dubrovnik-old-town-wall.jpg`,
        alt: 'Stone city walls of Dubrovnik perched on a cliff above the Adriatic Sea',
        caption: 'Old Town walls, Dubrovnik',
      },
    ],
  },
]

export const allPhotos = photoLocations.flatMap((location) =>
  location.photos.map((photo) => ({ ...photo, locationId: location.id, locationName: location.name })),
)
