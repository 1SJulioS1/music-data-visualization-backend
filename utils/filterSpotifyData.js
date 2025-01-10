export function filterData(data) {
  return {
    external_urls: data.external_urls,
    followers: { total: data.followers?.total },
    owner: {
      display_name: data.owner?.display_name,
      external_urls: data.owner?.external_urls,
    },
    tracks: {
      uri: data.tracks?.href,
      items: data.tracks?.items?.map((item) => ({
        track: {
          added_at: item?.added_at,
          duration_ms: item?.track?.duration_ms,
          disc_number: item?.track?.disc_number,
          external_urls: item?.track?.external_urls,
          name: item?.track?.name,
          popularity: item?.track?.popularity,
          preview_url: item?.track?.preview_url,
          album: {
            album_type: item?.track?.album?.album_type,
            artists: item?.track?.album?.artists?.map((artist) => ({
              name: artist?.name,
              external_urls: artist?.external_urls,
            })),
            external_urls: item?.track?.album?.external_urls,
            images: item?.track?.album?.images,
            name: item?.track?.album?.name,
            release_date: item?.track?.album?.release_date,
            total_tracks: item?.track?.album?.total_tracks,
          },
          artists: item?.track?.artists?.map((artist) => ({
            name: artist?.name,
            external_urls: artist?.external_urls,
          })),
        },
      })),
    },
  };
}
