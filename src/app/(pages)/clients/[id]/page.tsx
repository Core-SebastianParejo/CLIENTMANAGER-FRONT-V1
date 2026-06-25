import ClientDetailScreen from "@/modules/clients/detail/screens/ClientsDetailScreen";
const ClientDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ClientDetailScreen id={id} />;
};

export default ClientDetailPage;
