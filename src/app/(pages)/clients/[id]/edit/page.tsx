import ClientEditScreen from "@/modules/clients/edit/screens/ClientsEditScreen";
const ClientEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ClientEditScreen id={id} />;
};

export default ClientEditPage;
