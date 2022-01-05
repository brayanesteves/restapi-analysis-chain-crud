# DATA BASE. MULTIPLE INVENTORY, PURCHASE AND SALE SYSTEM [MIPSS] / BASE DE DATOS. SISTEMA DE INVENTARIO, COMPRA Y VENTA MULTIPLE [MIPSS]

CREATE DATABASE IF NOT EXISTS `MIPSS_`;

USE `MIPSS_`;
# TABLAS (TABLES)


# --------- <ENGLISH: MODULE. USERS / SPANISH: MÓDULO. USUARIOS> ----------- #

# <ENGLISH: USERS / SPANISH: USUARIOS>
CREATE TABLE IF NOT EXISTS `MIPSS_`.`0_Chns` (
    `Rfrnc`        INT    (255) NOT NULL AUTO_INCREMENT COMMENT 'Rfrnc        (English: Reference                          / Spanish: Referencia)',
    `text`        VARCHAR(20)  NOT NULL                COMMENT '',
    `Chn`        VARCHAR(20)  NOT NULL                COMMENT '',
    `Plndrm`       INT(2) NOT NULL                COMMENT '',    
    `Cndtn`        INT    (2)   NOT NULL                COMMENT 'Cndtn        (English: Condition [0: Inactive, 1: Active] / Spanish: Estado [0: Inactivo, 1: Activo])',
    `Rmvd`         INT    (2)   NOT NULL                COMMENT 'Rmvd         (English: Removed [0: Inactive, 1: Active]   / Spanish: Eliminado [0: Inactivo, 1: Activo])',
    `Lckd`         INT    (2)   NOT NULL                COMMENT 'Lckd         (English: Locked [0: Inactive, 1: Active]    / Spanish: Bloqueado [0: Inactivo, 1: Activo])',
    `DtAdmssn`     DATE             NULL                COMMENT 'DtAdmssn     (English: Date of Admission                  / Spanish: Fecha de Ingreso)',
    `ChckTm`       TIME             NULL                COMMENT 'ChckTm       (English: Check In Time                      / Spanish: Hora de Ingreso)',
    PRIMARY KEY (`Rfrnc`)
) ENGINE='MyISAM' DEFAULT CHARSET='utf8' COLLATE='utf8_bin' COMMENT='0_Chns (English: 0 -  / Spanish: 0 - )';
DESCRIBE `MIPSS_`.`0_Chns`
# <0 - USUARIOS: INSERTAR DATOS>

# <0 - USUARIOS: INSERTAR DATOS>
# <.ENGLISH: USERS / SPANISH: USUARIOS>

# <PROCEDURE: ADD OR EDIT>
CREATE PROCEDURE `0_chnsAddOrEdit`(
    IN `_Rfrnc`        INT    (255),
    IN `_text`        VARCHAR(255),
    IN `_Chn`        VARCHAR(255),
    IN `_Plndrm`       INT(2),    
    IN `_Cndtn`        INT    (2)  ,
    IN `_Rmvd`         INT    (2)  ,
    IN `_Lckd`         INT    (2)  ,
    IN `_DtAdmssn`     DATE        ,
    IN `_ChckTm`       TIME        
)
BEGIN
    IF `_Rfrnc` = 0 THEN 
        INSERT INTO `0_Chns` (`text`, `Chn`, `Plndrm`, `Cndtn`, `Rmvd`, `Lckd`, `DtAdmssn`, `ChckTm`) 
        VALUES (`_text`, `_Chn`, `_Plndrm`, `_Cndtn`, `_Rmvd`, `_Lckd`, `_DtAdmssn`, `_ChckTm`);
        SET `_Rfrnc` = LAST_INSERT_ID();
    ELSE
        UPDATE `0_Chns`
            SET `text` = `_text`, `Chn` = `_Chn`, `Plndrm` = `_Plndrm`, `Cndtn` = `_Cndtn`, `Rmvd` = `_Rmvd`, `Lckd` = `_Lckd` WHERE `Rfrnc` = `_Rfrnc`;
    END IF;

    SELECT `_Rfrnc` AS `Rfrnc`;
END
# <.PROCEDURE: ADD OR EDIT>