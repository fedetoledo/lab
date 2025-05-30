const TextRollup = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center gap-10'>
      <RollupText word='HOME' />
      <RollupText word='ARTICLES' />
      <RollupText word='BLOG' />
      <RollupText word='ACCOUNT' />
    </div>
  );
};

export default TextRollup;

export const RollupText = ({ word }: { word: string }) => {
  return (
    <div className='group relative h-5 cursor-pointer overflow-hidden'>
      <div className='group-hover:-translate-y-5 transition duration-500'>
        <div
          className='text-xl leading-5 transition duration-500 group-hover:rotate-20 origin-right'
          style={{ transformOrigin: 'right center' }}
        >
          {word}
        </div>
        <div
          className='text-xl leading-5 group-hover:rotate-0 transition duration-500 rotate-20'
          style={{ transformOrigin: 'left center' }}
        >
          {word}
        </div>
      </div>
    </div>
  );
};
