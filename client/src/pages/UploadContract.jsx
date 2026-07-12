import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import UploadHero from "@/components/upload/UploadHero";
import UploadDropzone from "@/components/upload/UploadDropzone";
import SelectedFileCard from "@/components/upload/SelectedFileCard";
import AnalysisOptions from "@/components/upload/AnalysisOptions";
import UploadActions from "@/components/upload/UploadActions";

import { uploadDocument } from "@/services/documentApi";
import { analyzeDocument } from "@/services/reportApi";

export default function UploadContract() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedCardRef = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState([
    "summary",
    "risk",
  ]);

  // Scroll after selecting file
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);

    setTimeout(() => {
      selectedCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handleToggleOption = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select a contract first.");
      return;
    }

    try {
      setLoading(true);

      const uploadRes = await uploadDocument(file);

      toast.success("Contract uploaded successfully.");

      const analysisRes = await analyzeDocument(
        uploadRes.document._id,
        selectedOptions
      );

      toast.success("AI analysis complete.");

      navigate(`/reports/${analysisRes.report.id}`);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Upload or analysis failed. Please try again."
      );

      navigate("/documents");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);

    setSelectedOptions([
      "summary",
      "risk",
    ]);

    toast.success("Form reset.");
  };

  const handlePreview = () => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    window.open(url);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">

      {/* Hero */}
      <UploadHero />

      {/* Upload */}
      <UploadDropzone
        selectedFile={file}
        onFileSelect={handleFileSelect}
        disabled={loading}
      />

      {/* Selected File */}
      {file && (
        <div ref={selectedCardRef}>
          <SelectedFileCard
            file={file}
            onPreview={handlePreview}
            onRemove={() => setFile(null)}
            disabled={loading}
          />
        </div>
      )}

      {/* AI Options */}
      <AnalysisOptions
        selectedOptions={selectedOptions}
        onToggleOption={handleToggleOption}
        disabled={loading}
      />

      {/* Actions */}
      <UploadActions
        file={file}
        loading={loading}
        selectedOptions={selectedOptions}
        onAnalyze={handleAnalyze}
        onReset={handleReset}
      />

    </div>
  );
}