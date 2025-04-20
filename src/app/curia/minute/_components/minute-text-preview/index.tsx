'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fillTemplate, minuteTemplate } from '../../_utils/minute-template';

interface MinuteTextPreviewProps {
  formData: any;
  onTextEdit: (text: string) => void;
}

export function MinuteTextPreview({
  formData,
  onTextEdit,
}: MinuteTextPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullText, setFullText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  // Update text when form data changes
  useEffect(() => {
    if (!formData) return;

    // Use the template to generate the minute text
    const filledText = fillTemplate(minuteTemplate, formData);
    setFullText(filledText);
  }, [formData]);

  const handleSaveEdit = () => {
    // Save manual edits
    if (textRef.current) {
      const newText = textRef.current.innerText;
      onTextEdit(newText);
      setFullText(newText);
    }
    setIsEditing(false);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Visualização da Ata</h2>
          <div className="flex gap-2">
            {isEditing ? (
              <Button
                onClick={handleSaveEdit}
                variant="default"
                size="sm"
                type="button"
              >
                <Save className="h-4 w-4 mr-2" /> Salvar Edições
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                type="button"
              >
                <Edit2 className="h-4 w-4 mr-2" /> Editar Texto
              </Button>
            )}
          </div>
        </div>

        <div
          ref={textRef}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          className={`text-sm whitespace-pre-line ${
            isEditing ? 'border p-4 rounded min-h-[200px]' : 'p-2'
          }`}
        >
          {fullText}
        </div>
      </CardContent>
    </Card>
  );
}
