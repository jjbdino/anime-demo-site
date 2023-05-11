export type Filters = {
  search: string;
  favorite: boolean;
  rated: boolean;
}

export type Anime = {
  id: number;
  title: string;
  type: string;
  synopsis: string;
  coverImage: {
    tiny: string;
    small: string;
    original: string;
    large: string;
  }
  episodeCount: number;
  averageRating: string;
  userCount: number;
  favoritesCount: number;
  popularityRank: number;
  createdAt: string;
  updatedAt: string;
  ageRating: string;
  ageRatingGuide: string;
  showType: string;
  startDate: string;
  endDate: string;
}

export type Episode = {
  id: string;
  airdate: string;
  title: string;
  number: number
}

export type Character = {
  id: string;
  name: string;
  slug: string;
  image: {
    tiny: string;
    small: string;
    original: string;
    large: string;
    medium: string;
  }
}

export type KitsuResponse = {
  data: KitsuData[] | KitsuData;
  meta: {count: number};
  links: KitsuLinks
}

export type KitsuData = {
  id: string;
  type: string;
  links: {self: string};
  attributes: KitsuAttr;
  relationships: any;
}

export type KitsuImage = {
  tiny: string;
  small: string;
  original: string;
  large: string;
}

export type KitsuAttr = {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  canonicalTitle: string;
  averageRating: string;
  userCount: number;
  favoritesCount: number;
  popularityRank: number;
  ratingRank: number;
  episodeCount: number;
  episodeLength: number;
  youtubeVideoId: string;
  coverImage: KitsuImage;
  ageRating: string;
  ageRatingGuide: string;
  showType: string;
  startDate: string;
  endDate: string;
}

export type KitsuLinks = {
  first: string;
  prev: string;
  next: string;
  last: string;
}

export type LoadingProps = {
  loading: boolean;
  context: string;
}
