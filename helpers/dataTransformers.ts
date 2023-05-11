import { Anime, Character, Episode, KitsuData } from "@/typings";

export const rawCollectionToAnimeList = (data: KitsuData[]): Anime[] => {
  return data.map((item: KitsuData) => rawToAnime(item));
}

export const rawToAnime = (data: KitsuData): Anime => {
  const {id, type, attributes, } = data;
  const {
    canonicalTitle, synopsis, coverImage, createdAt, updatedAt, episodeCount, averageRating, userCount,
    favoritesCount, popularityRank, ageRating, ageRatingGuide, showType, startDate, endDate
  } = attributes;

  return {
    id: parseInt(id),
    title: canonicalTitle,
    type: type,
    synopsis: synopsis,
    coverImage: coverImage,
    episodeCount: episodeCount,
    averageRating: averageRating,
    userCount: userCount,
    favoritesCount: favoritesCount,
    popularityRank: popularityRank,
    createdAt: createdAt,
    updatedAt: updatedAt,
    ageRating: ageRating,
    ageRatingGuide: ageRating,
    showType: showType,
    startDate: startDate,
    endDate: endDate
  };
}

export const rawCollectionToEpisodeList = (data: any[]): Episode[] => {
  return data.map((item: any) => rawToEpisode(item));
}

export const rawToEpisode = (data: any): Episode => {
  const {id, attributes: { airdate, canonicalTitle, number }} = data;
  return {
    id: id,
    airdate: airdate,
    title: canonicalTitle,
    number: number
  };
}

export const rawCollectionToCharacterList = (data: any[]): Character[] => {
  return data.map((item: any) => rawToCharacter(item));
}

export const rawToCharacter = (data: any): Character => {
  const {id, attributes: { slug, canonicalName, number, image }} = data;
  return {
    id: id,
    slug: slug,
    name: canonicalName,
    image: image
  };
}
