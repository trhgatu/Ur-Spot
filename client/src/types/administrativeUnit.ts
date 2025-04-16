export interface Province {
    code: string;
    name: string;
  }

  export interface District {
    code: string;
    name: string;
  }

  export interface Ward {
    code: string;
    name: string;
  }

  export interface AdministrativeUnit {
    provinceId: string;
    provinceName: string;
    districtId: string;
    districtName: string;
    wardId?: string;
    wardName?: string;
  }