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

// Placeholder data — swap in real coordinates/photos once available.
export const photoLocations: PhotoLocation[] = [
  {
    id: 'durham-nc',
    name: 'Durham, NC',
    lat: 35.994,
    lon: -78.8986,
    photos: [
      { src: '/images/profile.jpg', alt: 'Placeholder photo from Durham, NC' },
    ],
  },
  {
    id: 'new-york-ny',
    name: 'New York, NY',
    lat: 40.7128,
    lon: -74.006,
    photos: [
      { src: '/images/profile.jpg', alt: 'Placeholder photo from New York, NY' },
      { src: '/images/profile.jpg', alt: 'Placeholder photo from New York, NY' },
    ],
  },
  {
    id: 'mexico-city',
    name: 'Mexico City, Mexico',
    lat: 19.4326,
    lon: -99.1332,
    photos: [],
  },
]

export const allPhotos = photoLocations.flatMap((location) =>
  location.photos.map((photo) => ({ ...photo, locationId: location.id, locationName: location.name })),
)
