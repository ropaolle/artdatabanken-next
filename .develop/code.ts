// Run watch without re-renders

const watch = form.watch;

useEffect(() => {
  const subscription = watch(({ image }) => {
    // Update preview
    setPreviewUrl(images?.find(({ id }) => image === id)?.thumbnail_url);
  });

  return () => {
    subscription.unsubscribe();
  };
}, [watch, images]);
