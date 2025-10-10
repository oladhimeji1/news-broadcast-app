import { useCallback, useEffect, useRef, useState } from 'react';

export interface RadiocultData {
  id?: string;
  name?: string;
  streamUrl?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  logo?: Record<string, string> | null;
  country?: string[];
  donationLink?: string;
  edition?: string;
  favouritedCount?: number;
  socials?: any;
  listeners?: string;
  description?: string;
  playlists?: any[];
  channels?: any[];
  raw?: any;
}

interface UseRadiocultOpts {
  pollInterval?: number;
  apiKey?: string;
}

export default function useRadiocult(stationId: string, opts: UseRadiocultOpts = {}) {
  const { pollInterval = 30000, apiKey } = opts;
  const [data, setData] = useState<RadiocultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const running = useRef(false);
  const DEFAULT_API_KEY = 'pk_11730d4c647a423bb05f8080a8088c6c';

  const fetchOnce = useCallback(async () => {
  if (running.current) return;
  running.current = true;
  setLoading(true);
  setError(null);

  try {
    const url = `https://api.radiocult.fm/api/station/refwordfm/schedule/live`;
    const key = apiKey ?? DEFAULT_API_KEY;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "x-api-key": key,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const payload = await res.json();
    // 👇 If it has .result, we’re dealing with schedule data
    let station: any;
    if (payload.result) {
      station = {
        ...payload.result.content,
        metadata: payload.result.metadata,
        status: payload.result.status,
      };
    } else {
      station = payload.station ?? payload;
    }

    const firstChannel =
      Array.isArray(station.channels) && station.channels.length > 0
        ? station.channels[0]
        : undefined;

    const resolvedImage =
      station.artwork ??
      station.logo?.default ??
      firstChannel?.artwork ??
      firstChannel?.logo?.default;

    const rd: RadiocultData = {
      id: station.id,
      name: station.name ?? station.title,
      streamUrl:
        firstChannel?.stream_url ??
        firstChannel?.streamingUrl ??
        station.stream ??
        station.streamUrl ??
        station.stream_url,
      title: station.name ?? station.title ?? station.id,
      subtitle: station.tagline ?? station.subtitle,
      image: resolvedImage,
      logo: station.logo ?? null,
      country: station.country ?? undefined,
      donationLink: station.donationLink ?? undefined,
      edition: station.edition ?? undefined,
      favouritedCount:
        station.favouritedCount ??
        station.favourited_count ??
        undefined,
      socials: station.socials ?? undefined,
      listeners:
        station.listeners != null
          ? String(station.listeners)
          : undefined,
      description:
        station.description ?? station.shortDescription ?? station.metadata?.description,
      playlists: station.playlists ?? station.recentPlaylists,
      channels: station.channels ?? undefined,
      raw: payload, // 👈 keep the full original response
    };

    setData(rd);
  } catch (err) {
    setError(err);
    setData(null);
  } finally {
    running.current = false;
    setLoading(false);
  }
}, [stationId, apiKey]);


  useEffect(() => {
    fetchOnce();
    const id = setInterval(fetchOnce, pollInterval);
    return () => clearInterval(id);
  }, [fetchOnce, pollInterval]);

  return { data, loading, error, refresh: fetchOnce } as const;
}
