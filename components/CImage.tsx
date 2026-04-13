import React, { useEffect, useState } from 'react';
import { Image, View, type ImageStyle, type StyleProp } from 'react-native';
import { fetchImageBase64 } from '../services/api';

type Props = {
  imageId: number | string;
  className?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
};

const cache = new Map<string, string>();

export default function CImage({
  imageId,
  className,
  style,
  resizeMode = 'cover',
}: Props) {
  const [uri, setUri] = useState<string | null>(cache.get(String(imageId)) ?? null);

  useEffect(() => {
    const key = String(imageId);
    if (cache.has(key)) {
      setUri(cache.get(key)!);
      return;
    }
    let mounted = true;
    fetchImageBase64(imageId).then((data) => {
      if (data && mounted) {
        cache.set(key, data);
        setUri(data);
      }
    });
    return () => { mounted = false; };
  }, [imageId]);

  if (!uri) {
    return <View className={className} style={style} />;
  }

  return (
    <Image
      source={{ uri }}
      className={className}
      style={style}
      resizeMode={resizeMode}
    />
  );
}
