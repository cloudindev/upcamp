import { useFormContext } from 'react-hook-form';

export default function GuestNotesTab() {
    const { register } = useFormContext();
    return (
        <div className="max-w-4xl">
            <h3 className="text-lg font-medium text-text-primary mb-4">Observaciones</h3>
            <label className="block text-sm font-medium text-text-secondary mb-2">Notas internas</label>
            <textarea
                {...register('notes')}
                rows={8}
                className="input w-full resize-none"
                placeholder="Añadir notas privadas sobre el cliente..."
            ></textarea>
        </div>
    );
}
