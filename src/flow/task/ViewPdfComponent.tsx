import React, { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import { getDocContent } from "../../service/ApiService";
  
const ViewPdfComponent = (props: any) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber] = useState(1);
    const [pdfUrl, setPdfUrl] = useState<any>(null);

    const onDocumentLoadSuccess = (value: any) => {
        setNumPages(value.numPages);
    }

    useEffect(() => {
        const renderDocument = () => {
            getDocContent(props.viewDoc.documentId)
                .then((response: any) => {
                    setPdfUrl(window.URL.createObjectURL(response));
                })
        }
        renderDocument();
    }, [props.viewDoc]);

    return (
        <div className="document-pdf">
            {pdfUrl && <Document
                className="--scale-factor:0.75 !important"
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page scale={0.7} pageNumber={pageNumber} />
            </Document>
            }
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}

export default ViewPdfComponent;