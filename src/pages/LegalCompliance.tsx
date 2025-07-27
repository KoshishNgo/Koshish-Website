import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Shield, Scale, Users, Building, Heart, AlertTriangle } from "lucide-react";

const LegalCompliance = () => {
  const [documents, setDocuments] = useState([]);

  // Document categories with icons and descriptions
  const documentCategories = [
    {
      name: "Policies",
      icon: Shield,
      description: "Organizational policies and guidelines",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Legal Documents",
      icon: Scale,
      description: "Legal compliance and regulatory documents",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "HR Documents",
      icon: Users,
      description: "Human resources policies and procedures",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "Financial",
      icon: Building,
      description: "Financial reports and tax documents",
      color: "bg-orange-100 text-orange-800"
    },
    {
      name: "Program Policies",
      icon: Heart,
      description: "Program-specific guidelines and protocols",
      color: "bg-pink-100 text-pink-800"
    }
  ];

  // Static list of legal compliance documents
  const legalDocuments = [
    {
      name: "FCRA Renewal Certificate 2021",
      type: "PDF",
      category: "Legal Documents",
      description: "Foreign Contribution Regulation Act certificate renewal for 2021",
      fileName: "FCRA-Renewal-Certificate 2021.pdf",
      size: "2.1 MB",
      lastModified: "2021-12-15"
    },
    {
      name: "Gender Policy of Koshish Charitable Trust",
      type: "PDF",
      category: "Policies",
      description: "Comprehensive gender policy outlining our commitment to gender equality",
      fileName: "GENDER POLICY OF KOSHISH CHARITABLE TRUST.pdf",
      size: "1.8 MB",
      lastModified: "2023-08-20"
    },
    {
      name: "HR Policy of Koshish Charitable Trust",
      type: "PDF",
      category: "HR Documents",
      description: "Human resources policy document covering employment guidelines",
      fileName: "HR POLICY OF KOSHISH CHARITABLE TRUST.pdf",
      size: "2.5 MB",
      lastModified: "2023-07-15"
    },
    {
      name: "Code of Conduct (Hindi)",
      type: "DOCX",
      category: "Policies",
      description: "Organizational code of conduct in Hindi language",
      fileName: "KCT Policy 6 Koshish Code of Conduct Hindi.docx",
      size: "1.2 MB",
      lastModified: "2023-06-10"
    },
    {
      name: "Sexual Harassment Policy",
      type: "DOCX",
      category: "HR Documents",
      description: "Policy addressing sexual harassment prevention and response",
      fileName: "KCT Policy 7 KOshish Sexual Harassment.docx",
      size: "950 KB",
      lastModified: "2023-05-25"
    },
    {
      name: "Child Safeguarding Policy",
      type: "DOCX",
      category: "Program Policies",
      description: "Comprehensive child protection and safeguarding guidelines",
      fileName: "KCT Policy 8 Koshish Child Safeguarding.docx",
      size: "1.1 MB",
      lastModified: "2023-09-05"
    },
    {
      name: "Mexico City Policy Declaration",
      type: "DOCX",
      category: "Legal Documents",
      description: "Declaration regarding Mexico City Policy compliance",
      fileName: "KCT Policy 9 Koshish Mexico City Policy Declaration.docx",
      size: "800 KB",
      lastModified: "2023-04-12"
    },
    {
      name: "Salary Structure Policy",
      type: "DOCX",
      category: "HR Documents",
      description: "Organizational salary structure and compensation guidelines",
      fileName: "KCT Policy 10 Koshish Salary Structure.docx",
      size: "1.3 MB",
      lastModified: "2023-08-30"
    },
    {
      name: "Whistleblowing Policy",
      type: "DOCX",
      category: "Policies",
      description: "Whistleblowing and grievance reporting mechanisms",
      fileName: "KCT Policy 11 Koshish Whistle blowing.docx",
      size: "1.0 MB",
      lastModified: "2023-07-22"
    },
    {
      name: "Worker Guidelines (Hindi)",
      type: "DOCX",
      category: "HR Documents",
      description: "Worker guidelines and procedures in Hindi",
      fileName: "KCT Policy 12 Koshish Worker Guide line Hindi.docx",
      size: "1.4 MB",
      lastModified: "2023-06-18"
    },
    {
      name: "Communications Policy",
      type: "PDF",
      category: "Policies",
      description: "Organizational communication guidelines and procedures",
      fileName: "Koshish communications policy.pdf",
      size: "1.6 MB",
      lastModified: "2023-05-10"
    },
    {
      name: "Finance Policy",
      type: "PDF",
      category: "Financial",
      description: "Financial management and accounting policies",
      fileName: "Koshish finance Policy.pdf",
      size: "2.2 MB",
      lastModified: "2023-09-15"
    },
    {
      name: "Fixed Assets Policy",
      type: "PDF",
      category: "Financial",
      description: "Policy for management and tracking of fixed assets",
      fileName: "Koshish Fixed assets policy.pdf",
      size: "1.7 MB",
      lastModified: "2023-08-05"
    },
    {
      name: "Procurement Policy",
      type: "PDF",
      category: "Financial",
      description: "Procurement and purchasing guidelines",
      fileName: "Koshish Procurement policy f.pdf",
      size: "1.9 MB",
      lastModified: "2023-07-28"
    },
    {
      name: "Staff Agreement",
      type: "PDF",
      category: "HR Documents",
      description: "Standard staff employment agreement template",
      fileName: "staff agreement.pdf",
      size: "1.1 MB",
      lastModified: "2023-06-02"
    },
    {
      name: "IT Return 2022",
      type: "PDF",
      category: "Financial",
      description: "Income Tax return for financial year 2022",
      fileName: "IT Return-2022.pdf",
      size: "3.2 MB",
      lastModified: "2022-12-31"
    },
    {
      name: "IT Return 2023",
      type: "PDF",
      category: "Financial",
      description: "Income Tax return for financial year 2023",
      fileName: "IT Return-2023.pdf",
      size: "3.5 MB",
      lastModified: "2023-12-31"
    },
    {
      name: "IT Return 2024",
      type: "PDF",
      category: "Financial",
      description: "Income Tax return for financial year 2024",
      fileName: "IT Return-2024.pdf",
      size: "3.8 MB",
      lastModified: "2024-12-31"
    }
  ];

  useEffect(() => {
    setDocuments(legalDocuments);
  }, []);

  const downloadDocument = (fileName: string) => {
    // Create a download link for documents in the public/legal compliance folder
    const link = document.createElement('a');
    link.href = `/legal compliance/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-600" />;
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const getCategoryData = (categoryName: string) => {
    return documentCategories.find(cat => cat.name === categoryName) || documentCategories[0];
  };

  const filteredDocuments = (category: string) => {
    return documents.filter((doc: any) => doc.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-koshish-blue/5 to-koshish-green/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-koshish-blue mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-koshish-blue">
              Legal Compliance
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparency and accountability are at the heart of our operations. 
            Access our legal documents, policies, and compliance materials.
          </p>
        </div>

        {/* Compliance Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">
                  Transparency & Compliance Statement
                </h3>
                <p className="text-orange-700 text-sm">
                  Koshish Charitable Trust is committed to maintaining the highest standards of 
                  transparency and legal compliance. All our policies and procedures are regularly 
                  updated to ensure adherence to local and national regulations. For any queries 
                  regarding our compliance documentation, please contact our admin team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Categories */}
        <div className="space-y-8">
          {documentCategories.map((category) => {
            const categoryDocs = filteredDocuments(category.name);
            if (categoryDocs.length === 0) return null;

            const IconComponent = category.icon;
            
            return (
              <Card key={category.name} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('100', '200')}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-koshish-blue">
                        {category.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">
                        {category.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {categoryDocs.length} documents
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {categoryDocs.map((doc: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getFileIcon(doc.type)}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {doc.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {doc.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Type: {doc.type}</span>
                                <span>Size: {doc.size}</span>
                                <span>Updated: {new Date(doc.lastModified).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadDocument(doc.fileName)}
                            className="ml-4 flex-shrink-0"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Information */}
        <Card className="mt-12 bg-koshish-blue text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Need Additional Documentation?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              If you require any additional compliance documents or have questions 
              about our policies, please don't hesitate to reach out to us.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="/contact">
                Contact Our Admin Team
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalCompliance;
