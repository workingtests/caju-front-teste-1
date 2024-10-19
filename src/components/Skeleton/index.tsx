import { SkeletonBar, SkeletonContainer } from "./styles";

export const Skeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonBar />
      <SkeletonBar />
      <SkeletonBar />
    </SkeletonContainer>
  );
};
