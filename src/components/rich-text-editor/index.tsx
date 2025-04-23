'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Palette,
  Type,
  UnderlineIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string;
  editable?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  className,
  editable = true,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      // Use a timeout to ensure the editor is ready
      const timeout = setTimeout(() => {
        editor.commands.setContent(content);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [content, editor]);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set editor editable state when prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!isMounted || !editor) {
    return null;
  }

  return (
    <div className={cn('rich-text-editor', className)}>
      {editor && editable && (
        <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded-md bg-muted/30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              'h-8 w-8',
              editor.isActive('bold') ? 'bg-accent text-accent-foreground' : '',
            )}
            title="Negrito"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              'h-8 w-8',
              editor.isActive('italic')
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Itálico"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              'h-8 w-8',
              editor.isActive('underline')
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Sublinhado"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <div className="h-8 w-px bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={cn(
              'h-8 w-8',
              editor.isActive({ textAlign: 'left' })
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Alinhar à esquerda"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={cn(
              'h-8 w-8',
              editor.isActive({ textAlign: 'center' })
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Centralizar"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={cn(
              'h-8 w-8',
              editor.isActive({ textAlign: 'right' })
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Alinhar à direita"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={cn(
              'h-8 w-8',
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-accent text-accent-foreground'
                : '',
            )}
            title="Justificar"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <div className="h-8 w-px bg-border mx-1" />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Tamanho da fonte"
              >
                <Type className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm font-medium">Tamanho da fonte</p>
                <Select
                  onValueChange={(value) => {
                    editor.chain().focus().setFontSize(value).run();
                  }}
                  defaultValue="16px"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10px">10px</SelectItem>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px (padrão)</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="24px">24px</SelectItem>
                    <SelectItem value="30px">30px</SelectItem>
                    <SelectItem value="36px">36px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Cor do texto"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm font-medium">Cor do texto</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    '#000000',
                    '#FF0000',
                    '#00FF00',
                    '#0000FF',
                    '#FFFF00',
                    '#FF00FF',
                    '#00FFFF',
                    '#808080',
                  ].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-md"
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        editor.chain().focus().setColor(color).run()
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="w-8 h-8 p-0"
                    onChange={(e) =>
                      editor.chain().focus().setColor(e.target.value).run()
                    }
                  />
                  <span className="text-sm">Personalizado</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Destacar texto"
              >
                <Highlighter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm font-medium">Cor de destaque</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    '#FFFF00',
                    '#00FFFF',
                    '#FF00FF',
                    '#FF0000',
                    '#00FF00',
                    '#0000FF',
                    '#FFFFFF',
                    '#F0F0F0',
                  ].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-md"
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        editor.chain().focus().toggleHighlight({ color }).run()
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="w-8 h-8 p-0"
                    defaultValue="#FFFF00"
                    onChange={(e) =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: e.target.value })
                        .run()
                    }
                  />
                  <span className="text-sm">Personalizado</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Remove the BubbleMenu component which is causing the DOM error */}

      <EditorContent
        editor={editor}
        className={cn(
          'prose prose-sm max-w-none w-full min-h-[200px]',
          editable ? 'border rounded-md p-3' : 'p-2',
          className,
        )}
      />
    </div>
  );
}
