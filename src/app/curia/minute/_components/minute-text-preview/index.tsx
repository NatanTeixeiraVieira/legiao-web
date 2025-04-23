'use client';

import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fillTemplate, minuteTemplate } from '../../_utils/minute-template';
import { MinuteFormData } from '../minute-form/types/minute-form-data.type';

interface MinuteTextPreviewProps {
  formData: MinuteFormData;
  onTextEdit: (text: string) => void;
}

export function MinuteTextPreview({
  formData,
  onTextEdit,
}: MinuteTextPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullText, setFullText] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!formData) return;

    const textoPreenchido = fillTemplate(minuteTemplate, formData);
    setFullText(textoPreenchido);

    if (!isEditing) {
      const safeHtml = `<p>${textoPreenchido
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />')}</p>`;
      setHtmlContent(safeHtml);
    }
  }, [formData, isEditing]);

  const handleSaveEdit = () => {
    setIsEditing(false);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    onTextEdit(plainText);
    setFullText(plainText);
  };

  const handleEditorChange = (html: string) => {
    setHtmlContent(html);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Visualização da Ata</h2>
          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={handleSaveEdit} variant="default" size="sm">
                <Save className="h-4 w-4 mr-2" /> Salvar Edições
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                <Edit2 className="h-4 w-4 mr-2" /> Editar Texto
              </Button>
            )}
          </div>
        </div>

        <RichTextEditor
          content={htmlContent}
          onChange={handleEditorChange}
          editable={isEditing}
          className={isEditing ? '' : 'border-none p-0'}
        />
      </CardContent>
    </Card>
  );
}
