// Define the shape of your data
export type AdRateType = {
    _id: string;
    stt: number;
    website: string;
    platform?: string;
    position?: string;
    demo?: string;
    url?: string;
    buying_method?: string;
    csr?: number;
    ctr?: string;
    detailed_csr?: number; // Corrected spelling from deteailed_csr to detailed_csr
    dimensions?: string;
    est?: string;
    homepage?: number;
    week?: string;
    month?: string;
    quarter_year?: string;
    note?: string;
    price?: number;
    type: number;
};