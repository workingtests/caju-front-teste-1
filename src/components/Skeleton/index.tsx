import { SkeletonBar, SkeletonContainer } from "./styles";

export const Skeleton = () => {
  return (
    <SkeletonContainer role="status" aria-busy="true" aria-live="polite">
      <SkeletonBar role="status" aria-label="Loading content..." />
      <SkeletonBar role="status" aria-label="Loading content..." />
      <SkeletonBar role="status" aria-label="Loading content..." />
    </SkeletonContainer>
  );
};
