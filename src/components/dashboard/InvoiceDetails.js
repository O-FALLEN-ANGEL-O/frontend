import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import { Navigate } from 'react-router-dom'; // Import Navigate
import '../../css/Invoice.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInvoiceData = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`http://localhost:8801/invoices/${id}`);
                setInvoiceData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
                setError('Failed to fetch invoice data. Please try again.');
                setLoading(false);
            }
        };

        fetchInvoiceData();
    }, [id]);

    const renderPDF = async (data) => {
        if (!data) {
            console.error('No invoice data to render PDF');
            return;
        }

        try {
            const pdfUrl = `${process.env.PUBLIC_URL}/main.pdf`;
            const pdfBytes = await axios.get(pdfUrl, { responseType: 'arraybuffer' }).then(res => res.data);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const form = pdfDoc.getForm();

            // Field mapping and configuration
            const fieldDataMap = {
                'atlcode': ['atlcode'],
                'date': ['date'],
                'amount': ['expenditure', 'grant_in', 'total2'],
                'last_balance': ['last_balance', 'cash1', 'total1'],
                'interest': ['interest'],
                'intpaid': ['intpaid'],
                'granted_salary': ['granted_salary'],
                'granted_assest': ['granted_assest'],
                'granted': ['amount'],
                'advances': ['advances'],
                'advances2': ['advances2'],
                'total': ['total_fund'],
                'balance': ['closing_balance', 'cash2', 'total3'],
                'form_type': ['option'],
                'schema_name': ['schema_name'],
                'year': ['year_period']
            };

            // Iterate over each field in fieldDataMap
            Object.entries(fieldDataMap).forEach(([pdfFieldName, invoiceFieldNames]) => {
                invoiceFieldNames.forEach(fieldName => {
                    const field = form.getTextField(fieldName.toString());
                    if (field) {
                        let fieldValue = String(data[pdfFieldName] || '');

                        // Format date field to dd-mm-yyyy
                        if (pdfFieldName === 'date' && fieldValue) {
                            const dateObj = new Date(fieldValue);
                            const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
                            fieldValue = formattedDate;
                        }

                        // Default values for NA or 0 based on field name
                        if (!fieldValue && (pdfFieldName === 'granted_salary' || pdfFieldName === 'granted_assest')) {
                            fieldValue = 'NA';
                        } else if (!fieldValue && (pdfFieldName === 'advances' || pdfFieldName === 'advances2')) {
                            fieldValue = '0';
                        }

                        if (!fieldValue && (pdfFieldName === 'schema_name')) {
                            fieldValue = 'Atal Innovation Mission(AIM) including Self Employment and Talent Utilization (SETU) - [2351]';
                        }

                        // Set field properties
                        field.setText(fieldValue);
                        field.setFontSize(9);
                        field.setMaxLength(300);
                    }
                });
            });

            // Save and display the filled PDF
            const pdfBytesResult = await pdfDoc.save();
            const pdfDataUri = await createBlobUrl(pdfBytesResult, 'application/pdf');
            window.open(pdfDataUri, '_blank');
        } catch (error) {
            console.error('Error filling PDF form:', error);
        }
    };

    const formatAtlCode = (atlcode) => {
        const parts = atlcode.split(/(\(|\))/).filter(Boolean);
        const formattedLines = [];
        let currentLine = '';

        parts.forEach(part => {
            if (part === '(') {
                currentLine = `${currentLine.trim()}\n${part}`;
            } else if (part === ')') {
                currentLine = `${currentLine}${part}`;
                formattedLines.push(currentLine.trim());
                currentLine = '';
            } else {
                currentLine = `${currentLine} ${part}`.trim();
            }
        });

        return formattedLines.join('\n');
    };

    const createBlobUrl = async (data, type) => {
        const blob = new Blob([data], { type });
        return URL.createObjectURL(blob);
    };

    return (
        <div className="InvoiceDetails container">
            {loading ? (
                <p>Loading invoice details...</p>
            ) : error ? (
                <p className="error-msg">{error}</p>
            ) : invoiceData ? (
                <div className="invoice-data">
                    {/* Render invoice details */}
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.history.back()}
                            >
                                Back
                            </button>
                            <span className="navbar-brand mb-0 h1">Invoice Details</span>
                        </div>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Form Type:</strong> {invoiceData.form_type}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Year:</strong> {invoiceData.year}
                        </div>
                        <div className="col-sm-6">
                            <strong>ATL Code:</strong> {formatAtlCode(invoiceData.atlcode)}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Payment Category:</strong> {invoiceData.paymentCategory}
                        </div>
                        <div className="col-sm-6">
                            <strong>Payment Slab:</strong> {invoiceData.paymentSlab}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Date:</strong> {invoiceData.date}
                        </div>
                        <div className="col-sm-6">
                            <strong>Amount:</strong> {invoiceData.amount}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Comment:</strong> {invoiceData.comment}
                        </div>
                        <div className="col-sm-6">
                            <strong>File:</strong> {invoiceData.file}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Vendor:</strong> {invoiceData.vendor}
                        </div>
                        <div className="col-sm-6">
                            <strong>Payment Type:</strong> {invoiceData.paymentType}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Reference Number:</strong> {invoiceData.referenceNumber}
                        </div>
                        <div className="col-sm-6">
                            <strong>PFMS:</strong> {invoiceData.pfms}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Last Balance:</strong> {invoiceData.last_balance}
                        </div>
                        <div className="col-sm-6">
                            <strong>Interest:</strong> {invoiceData.interest}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Interest Paid:</strong> {invoiceData.intpaid}
                        </div>
                        <div className="col-sm-6">
                            <strong>Granted:</strong> {invoiceData.granted}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Total:</strong> {invoiceData.total}
                        </div>
                        <div className="col-sm-6">
                            <strong>Balance:</strong> {invoiceData.balance}
                        </div>
                    </div>

                    {/* Button to generate PDF */}
                    <button className="btn btn-primary" onClick={() => renderPDF(invoiceData)}>
                        Generate PDF Form
                    </button>
                </div>
            ) : (
                <p>No invoice data found for ID: {id}</p>
            )}
        </div>
    );
};

export default InvoiceDetails;
