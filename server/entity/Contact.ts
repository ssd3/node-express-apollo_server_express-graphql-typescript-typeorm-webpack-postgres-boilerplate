import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/**
 * Contact entity
 */
@Entity('Contact' , {schema: 'template' } )
export class Contact {

    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id'
        })
    public id: number | undefined

    @Column('character varying', {
        nullable: false,
        length: 255,
        name: 'firstName'
        })
    public firstName: string | undefined

    @Column('character varying', {
        nullable: false,
        length: 255,
        name: 'lastName'
    })
    public lastName: string | undefined

    @Column('character varying', {
        nullable: false,
        length: 255,
        name: 'email'
    })
    public email: string | undefined

    @Column('character varying', {
        nullable: false,
        length: 13,
        name: 'phone'
    })
    public phone: string | undefined

    @Column('timestamp without time zone', {
        nullable: false,
        default:  () => 'now()',
        name: 'createdDate'
        })
    public createdDate: Date | undefined

    @Column('timestamp without time zone', {
        nullable: false,
        default:  () => 'now()',
        name: 'lastModifiedDate'
    })
    public lastModifiedDate: Date | undefined
}
