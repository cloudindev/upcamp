import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import * as Tabs from '@radix-ui/react-tabs';
import { guestsApi } from '../services/guestsApi';

// Tabs
import GuestInfoTab from '../components/guests/GuestInfoTab';
import GuestBillingTab from '../components/guests/GuestBillingTab';
import GuestCompanionsTab from '../components/guests/GuestCompanionsTab';
import GuestIdsTab from '../components/guests/GuestIdsTab';
import GuestDocumentsTab from '../components/guests/GuestDocumentsTab';
import GuestVehiclesTab from '../components/guests/GuestVehiclesTab';
import GuestLoansTab from '../components/guests/GuestLoansTab';
import GuestNotesTab from '../components/guests/GuestNotesTab';

export default function GuestDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isNew = id === 'new';

    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            language: 'es',
            address: '',
            postalCode: '',
            city: '',
            province: '',
            country: 'España',
            nationality: 'Española',
            documentType: 'DNI',
            documentNumber: '',
            billing: {
                billingName: '',
                taxId: '',
                email: '',
                phone: '',
                address: '',
                postalCode: '',
                city: '',
                province: '',
                country: 'España',
            },
            notes: '',
        }
    });

    const { reset, handleSubmit } = methods;

    const { data: guest, isLoading } = useQuery({
        queryKey: ['guest', id],
        queryFn: () => guestsApi.getById(id!),
        enabled: !isNew && !!id,
    });

    useEffect(() => {
        if (guest) {
            reset({
                ...guest,
                billing: guest.billing || {
                    billingName: '',
                    taxId: '',
                    email: '',
                    phone: '',
                    address: '',
                    postalCode: '',
                    city: '',
                    province: '',
                    country: 'España',
                }
            });
        }
    }, [guest, reset]);

    const mutation = useMutation({
        mutationFn: (data: any) => {
            if (isNew) {
                return guestsApi.create(data);
            } else {
                return guestsApi.update(id!, data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guests'] });
            if (!isNew) {
                queryClient.invalidateQueries({ queryKey: ['guest', id] });
            }
            navigate('/guests');
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };

    if (isLoading) {
        return <div className="p-8 text-center">Cargando...</div>;
    }

    const tabs = [
        { id: 'info', label: 'Datos de cliente', component: <GuestInfoTab /> },
        { id: 'billing', label: 'Datos de facturación', component: <GuestBillingTab /> },
        { id: 'companions', label: 'Acompañantes', component: <GuestCompanionsTab guest={guest} /> },
        { id: 'ids', label: 'Identificación', component: <GuestIdsTab guest={guest} /> },
        { id: 'documents', label: 'Documentos', component: <GuestDocumentsTab guest={guest} /> },
        { id: 'vehicles', label: 'Vehículos y Mascotas', component: <GuestVehiclesTab guest={guest} /> },
        { id: 'loans', label: 'Objetos en Préstamo', component: <GuestLoansTab guest={guest} /> },
        { id: 'notes', label: 'Observaciones', component: <GuestNotesTab /> },
    ];

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <Link to="/guests" className="text-text-secondary hover:text-text-primary text-sm flex items-center gap-1 mb-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Volver a clientes
                        </Link>
                        <h1 className="text-2xl font-bold text-text-primary">
                            {isNew ? 'Nuevo Cliente' : `Cliente: ${guest?.firstName} ${guest?.lastName}`}
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/guests')}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="btn btn-primary"
                        >
                            {mutation.isPending ? 'Guardando...' : 'Guardar Cliente'}
                        </button>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-sm border border-outline overflow-hidden min-h-[600px]">
                    <Tabs.Root defaultValue="info" className="flex flex-col h-full">
                        <Tabs.List className="flex overflow-x-auto border-b border-outline bg-gray-50/50">
                            {tabs.map((tab) => (
                                <Tabs.Trigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="px-6 py-4 text-sm font-medium text-text-secondary hover:text-text-primary border-b-2 border-transparent data-[state=active]:border-upcamp-blue data-[state=active]:text-upcamp-blue data-[state=active]:bg-white transition-all whitespace-nowrap"
                                >
                                    {tab.label}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        <div className="p-6 flex-1">
                            {tabs.map((tab) => (
                                <Tabs.Content key={tab.id} value={tab.id}>
                                    {tab.component}
                                </Tabs.Content>
                            ))}
                        </div>
                    </Tabs.Root>
                </div>
            </form>
        </FormProvider>
    );
}
