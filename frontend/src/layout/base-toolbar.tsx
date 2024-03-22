
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

export const BaseToolbar = () => {

    const items: MenuItem[] = [
        {
            label: 'Appointments',
            icon: 'pi pi-calendar'
        },
        {
            label: 'Experts',
            icon: 'pi pi-star'
        },
        {
            label: 'Services',
            icon: 'pi pi-search',
        },
        {
            label: 'Clients',
            icon: 'pi pi-envelope',
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
        