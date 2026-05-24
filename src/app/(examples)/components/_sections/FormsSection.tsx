'use client'

import { useState } from 'react'
import { ShowcaseBlock } from './ShowcaseBlock'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { RadioGroup } from '@/components/ui/Radio'
import { Slider } from '@/components/ui/Slider'
import { NumberInput } from '@/components/ui/NumberInput'
import { Rating } from '@/components/ui/Rating'
import { SearchInput } from '@/components/ui/SearchInput'
import { MaskInput } from '@/components/ui/MaskInput'
import { TimeInput } from '@/components/ui/TimeInput'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { OTPInput } from '@/components/ui/OTPInput'
import { TagInput } from '@/components/ui/TagInput'
import { Combobox } from '@/components/ui/Combobox'
import { MultiSelect } from '@/components/ui/MultiSelect'
import { DatePicker } from '@/components/ui/DatePicker'
import { DateRangePicker, type DateRange } from '@/components/ui/DateRangePicker'
import { FileUpload } from '@/components/ui/FileUpload'
import { Mail, Lock } from 'lucide-react'

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
]

export function FormsSection() {
  const [inputVal, setInputVal] = useState('')
  const [selectVal, setSelectVal] = useState('')
  const [textareaVal, setTextareaVal] = useState('')
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(false)
  const [radio, setRadio] = useState('react')
  const [slider, setSlider] = useState(40)
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(3)
  const [search, setSearch] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('09:00')
  const [color, setColor] = useState('#8b5cf6')
  const [otp, setOtp] = useState('')
  const [tags, setTags] = useState<string[]>(['design', 'react'])
  const [combo, setCombo] = useState<string | null>(null)
  const [multi, setMulti] = useState<string[]>([])
  const [date, setDate] = useState<string | undefined>(undefined)
  const [range, setRange] = useState<DateRange>({ start: null, end: null })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="Input">
        <div className="flex flex-col gap-3">
          <Input label="E-mail" type="email" placeholder="seu@email.com" value={inputVal} onChange={e => setInputVal(e.target.value)} leftIcon={<Mail size={14} />} />
          <Input label="Senha" type="password" placeholder="••••••••" leftIcon={<Lock size={14} />} />
          <Input label="Com erro" value="valor inválido" error="Este campo é obrigatório." readOnly />
          <Input label="Com dica" hint="Mínimo 8 caracteres." placeholder="..." />
          <Input label="Desabilitado" disabled placeholder="Não editável" />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Select & Textarea">
        <div className="flex flex-col gap-3">
          <Select
            label="Framework"
            value={selectVal}
            onChange={e => setSelectVal(e.target.value)}
            options={OPTIONS}
            placeholder="Selecionar..."
          />
          <Textarea
            label="Descrição"
            value={textareaVal}
            onChange={e => setTextareaVal(e.target.value)}
            placeholder="Escreva aqui..."
            rows={3}
          />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Checkbox & Switch">
        <div className="flex flex-col gap-4">
          <Checkbox
            label="Aceito os termos de uso"
            description="Ao marcar, você concorda com nossa política de privacidade."
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
          <Checkbox label="Desabilitado" disabled />
          <Checkbox label="Indeterminado" indeterminate />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Switch label="Notificações por e-mail" checked={switched} onChange={setSwitched} />
          <Switch label="Modo silencioso" description="Não incomodar." size="sm" checked={false} onChange={() => {}} />
          <Switch label="Desabilitado" disabled checked={false} onChange={() => {}} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="RadioGroup">
        <RadioGroup
          name="framework"
          label="Framework preferido"
          value={radio}
          onChange={setRadio}
          options={OPTIONS.slice(0, 4)}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="Slider & NumberInput">
        <div className="flex flex-col gap-4">
          <Slider value={slider} onChange={setSlider} label="Volume" showValue min={0} max={100} />
          <NumberInput value={quantity} onChange={setQuantity} label="Quantidade" min={1} max={99} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Rating & SearchInput">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">Avaliação</p>
            <Rating value={rating} onChange={setRating} size="lg" />
            <p className="mt-1 text-xs text-[var(--text-muted)]">{rating} de 5 estrelas</p>
          </div>
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar componentes..." />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="MaskInput" description="CPF, CNPJ, telefone, CEP">
        <div className="flex flex-col gap-3">
          <MaskInput mask="cpf" label="CPF" value={cpf} onChange={setCpf} />
          <MaskInput mask="phone" label="Telefone" value={phone} onChange={setPhone} />
          <MaskInput mask="cep" label="CEP" value="" onChange={() => {}} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="TimeInput & ColorPicker">
        <div className="flex flex-col gap-4">
          <TimeInput label="Horário" value={time} onChange={setTime} />
          <ColorPicker label="Cor do tema" value={color} onChange={setColor} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="OTPInput" description="Verificação em 6 dígitos">
        <div className="flex flex-col items-center gap-3">
          <OTPInput length={6} value={otp} onChange={setOtp} />
          {otp.length === 6 && (
            <p className="text-xs text-[var(--semantic-success)]">Código: {otp}</p>
          )}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="TagInput" description="Pressione Enter ou vírgula para adicionar">
        <TagInput value={tags} onChange={setTags} placeholder="Adicionar tag..." max={8} />
      </ShowcaseBlock>

      <ShowcaseBlock title="Combobox" description="Seleção com busca">
        <Combobox
          label="Framework"
          options={OPTIONS}
          value={combo ?? undefined}
          onChange={setCombo}
          placeholder="Selecionar framework..."
          clearable
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="MultiSelect" description="Seleção múltipla com chips">
        <MultiSelect
          label="Tecnologias"
          options={OPTIONS}
          value={multi}
          onChange={setMulti}
          placeholder="Selecionar tecnologias..."
          max={3}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="DatePicker">
        <DatePicker
          label="Data de início"
          value={date}
          onChange={v => setDate(v ?? undefined)}
          clearable
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="DateRangePicker">
        <DateRangePicker
          label="Período"
          value={range}
          onChange={setRange}
          clearable
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="FileUpload" description="Arraste ou clique para selecionar" wide>
        <FileUpload
          onFiles={files => console.log(files)}
          accept="image/png, image/jpeg, image/webp"
          multiple
          maxSizeMB={5}
        />
      </ShowcaseBlock>

    </div>
  )
}
