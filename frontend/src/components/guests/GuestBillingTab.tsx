import { useFormContext } from 'react-hook-form';

export default function GuestBillingTab() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Razón Social / Nombre</label>
                    <input
                        {...register('billing.billingName')}
                        type="text"
                        className="input w-full"
                        placeholder="Empresa S.L. o Nombre Completo"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">NIF / CIF</label>
                    <input
                        {...register('billing.taxId')}
                        type="text"
                        className="input w-full"
                        placeholder="B12345678"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email Facturación</label>
                    <input
                        {...register('billing.email')}
                        type="email"
                        className="input w-full"
                        placeholder="facturacion@empresa.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Teléfono Facturación</label>
                    <input
                        {...register('billing.phone')}
                        type="tel"
                        className="input w-full"
                        placeholder="+34 600 000 000"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Dirección Fiscal</label>
                    <input
                        {...register('billing.address')}
                        type="text"
                        className="input w-full"
                        placeholder="C/ Fiscal, 123"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">CP</label>
                        <input
                            {...register('billing.postalCode')}
                            type="text"
                            className="input w-full"
                            placeholder="08001"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Localidad</label>
                        <input
                            {...register('billing.city')}
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
                            {...register('billing.province')}
                            type="text"
                            className="input w-full"
                            placeholder="Barcelona"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">País</label>
                        <input
                            {...register('billing.country')}
                            type="text"
                            className="input w-full"
                            placeholder="España"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
