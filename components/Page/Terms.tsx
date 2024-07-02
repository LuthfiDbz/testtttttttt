import GlassmorphCard from "@/components/UI/card/GlassmorphCard";

const url = process.env.REACT_APP_URL_CUST;

const getTermsData = async () => {
  const res = await fetch(`${url}/api/term-condition`);
  return res.json()
}

const Terms = async ({ text }: any) => {
  const { data } = await getTermsData();
  return (
    <main className="w-screen bg-glassmorph bg-cover px-26 pt-20 pb-40">
      <GlassmorphCard className="flex flex-col border-2 rounded-3xl mt-10 w-full h-fit mx-auto px-20 py-10 gap-10 text-text-primary">
        <h3 className="text-center text-4xl font-semibold">{text?.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: data?.term }}></div>
      </GlassmorphCard>
    </main>
  );
}

export default Terms