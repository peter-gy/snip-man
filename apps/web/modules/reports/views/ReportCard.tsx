import { Text, Card, Button } from '@geist-ui/core';
import { ReactNode } from 'react';

type ReportCardProps = {
  title: string | ReactNode;
  description: string;
  onExploreClick?: () => void;
};

function ReportCard({ title, description, onExploreClick }: ReportCardProps) {
  return (
    <Card height="100%" width="100%" shadow>
      <Text h4 my={0} className="text-center">
        {title}
      </Text>
      <Text className="text-justify">{description}</Text>
      <Card.Footer>
        <div className="w-full flex justify-center">
          <Button type="success-light" ghost onClick={onExploreClick}>
            Explore
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default ReportCard;
