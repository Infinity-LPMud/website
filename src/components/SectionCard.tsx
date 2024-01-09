const SectionCard = (props: { sectionId: string; children: any }) => {
  const { sectionId, children, ...rest } = props;
  return (
    <section id={sectionId} {...rest}>
      <div className="h-screen overflow-y-auto ">
        <h1 className="text-4xl font-bold text-center">{children}</h1>
      </div>
    </section>
  );
};

export default SectionCard;
