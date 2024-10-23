import * as S from "./styles";

export const Skeleton = () => {
  return (
    <S.SkeletonContainer role="status" aria-busy="true" aria-live="polite">
      <S.SkeletonBar role="status" aria-label="Loading content..." />
      <S.SkeletonBar role="status" aria-label="Loading content..." />
      <S.SkeletonBar role="status" aria-label="Loading content..." />
    </S.SkeletonContainer>
  );
};
