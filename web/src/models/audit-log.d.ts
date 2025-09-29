import { COLLECTIONS } from './common';
export interface AuditLog {
    _id: string;
    store_id: string;
    actor: string;
    action: string;
    entity: keyof typeof COLLECTIONS;
    entity_id: string;
    before: any | null;
    after: any | null;
    ts: string;
}
export declare const sampleAuditLog: AuditLog;
//# sourceMappingURL=audit-log.d.ts.map