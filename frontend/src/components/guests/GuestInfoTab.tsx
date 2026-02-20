import { useFormContext } from 'react-hook-form';

export default function GuestInfoTab() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Nombre</label>
                    <input
                        {...register('firstName', { required: 'El nombre es obligatorio' })}
                        type="text"
                        className="input w-full"
                        placeholder="Luis"
                    />
                    {errors.firstName && (
                        <span className="text-xs text-red-500">{errors.firstName.message as string}</span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Apellidos</label>
                    <input
                        {...register('lastName', { required: 'Los apellidos son obligatorios' })}
                        type="text"
                        className="input w-full"
                        placeholder="García"
                    />
                    {errors.lastName && (
                        <span className="text-xs text-red-500">{errors.lastName.message as string}</span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="input w-full"
                        placeholder="luis@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Teléfono</label>
                    <input
                        {...register('phone')}
                        type="tel"
                        className="input w-full"
                        placeholder="+34 600 000 000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Idioma</label>
                    <select
                        {...register('language')}
                        className="input w-full"
                    >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                        <option value="nl">Neerlandés</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Dirección</label>
                    <input
                        {...register('address')}
                        type="text"
                        className="input w-full"
                        placeholder="C/ Ejemplo, 123"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">CP</label>
                        <input
                            {...register('postalCode')}
                            type="text"
                            className="input w-full"
                            placeholder="08001"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Localidad</label>
                        <input
                            {...register('city')}
                            type="text"
                            className="input w-full"
                            placeholder="Barcelona"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Provincia</label>
                        <input
                            {...register('province')}
                            type="text"
                            className="input w-full"
                            placeholder="Barcelona"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">País</label>
                        <input
                            {...register('country')}
                            type="text"
                            className="input w-full"
                            placeholder="España"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Nacionalidad</label>
                    <input
                        {...register('nationality')}
                        type="text"
                        className="input w-full"
                        placeholder="Española"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Tipo Documento</label>
                        <select
                            {...register('documentType')}
                            className="input w-full"
                        >
                            <option value="DNI">DNI</option>
                            <option value="NIE">NIE</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Nº Documento</label>
                        <input
                            {...register('documentNumber')}
                            type="text"
                            className="input w-full"
                            placeholder="12345678A"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
