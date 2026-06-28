import { gql } from "@apollo/client";

export const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
    }
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export const EXPORT_PDF = gql`
  mutation ExportPdf ($pdf: ExportPdfInput! ){
    exportPdf(pdf: $pdf)
  }
`;
