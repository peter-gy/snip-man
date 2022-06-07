import { SiMongodb, SiPostgresql } from 'react-icons/si';

function PostgresIcon({ size = 24 }: { size?: string | number }) {
  return <SiPostgresql fill="#32638c" size={size} />;
}

function MongoIcon({ size = 24 }: { size?: string | number }) {
  return <SiMongodb fill="#0f914e" size={size} />;
}

export { PostgresIcon, MongoIcon };
