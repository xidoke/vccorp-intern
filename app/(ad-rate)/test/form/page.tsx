
import {AddAdRateForm} from "@/components/form-insert-ad-rate";
import {fetchAllType} from "@/lib/data";

const FormPage = async () => {
    const types = await fetchAllType();
    return (
        <div>
            <AddAdRateForm types={types} initType={types[0]}/>
        </div>
    );
};

export default FormPage;

