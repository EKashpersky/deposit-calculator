export interface DomainSerializer<DomainModel, DomainPojo> {
  deserialize(name: string, deposit: DomainPojo): DomainModel;
  serialize(deposit: DomainModel): DomainPojo;
}