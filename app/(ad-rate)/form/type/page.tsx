import { AddAdRateForm } from '@/components/form-insert-ad-rate';
import { fetchAllType, fetchTypeById } from '@/lib/data';

const FormPage = async () => {
  const type = undefined;
  const types = await fetchAllType();
  return (
    <div>
      <AddAdRateForm types={types} initType={type} />
    </div>
  );
};

export default FormPage;
